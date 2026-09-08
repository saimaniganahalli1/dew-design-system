"use client";

/**
 * Custom component - not yet in components/base|application/**. See CONTEXT.md's "Custom
 * components" section: this lives here until a stakeholder decides it belongs in the design
 * system proper, at which point it moves to components/base or components/application (and this
 * directory entry goes away).
 *
 * A prev-arrow / calendar-icon / range-text / next-arrow control, styled like an Input. No DEW
 * component models this composition - input-date.tsx is a single-value DateField (react-aria
 * DateSegments), not a range with its own prev/next period stepper. Built from real react-aria
 * primitives (RangeCalendar, DialogTrigger) and the real DEW Popover (components/base/select/popover.tsx)
 * rather than a static placeholder, so it's an actual working control, not a lookalike.
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "@untitledui/icons";
import {
  Button as AriaButton,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Dialog,
  DialogTrigger,
  Heading,
  RangeCalendar,
  type DateRange,
} from "react-aria-components";
import { getLocalTimeZone, startOfWeek, today } from "@internationalized/date";
import { Popover } from "@/components/base/select/popover";
import { cx } from "@/utils/cx";

const formatDate = (date: DateRange["start"]) =>
  date.toDate(getLocalTimeZone()).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });

/**
 * Steps the whole range forward/back by its own length - e.g. a 5-day range steps by 5 days -
 * clamped to `min`/`max` so a step can never land partway outside the allowed window.
 */
function shiftRange(range: DateRange, direction: 1 | -1, min: DateRange["start"], max: DateRange["start"]): DateRange {
  const dayCount = range.end.compare(range.start) + 1;
  const offset = dayCount * direction;
  let start = range.start.add({ days: offset });
  let end = range.end.add({ days: offset });
  if (start.compare(min) < 0) {
    end = end.add({ days: min.compare(start) });
    start = min;
  }
  if (end.compare(max) > 0) {
    start = start.subtract({ days: end.compare(max) });
    end = max;
  }
  return { start, end };
}

export interface DateRangeControlProps {
  /** Uncontrolled initial range. Defaults to the current week (Monday through today). */
  defaultValue?: DateRange;
  /** Controlled range - pass with `onChange` to own the value. */
  value?: DateRange;
  onChange?: (value: DateRange) => void;
  className?: string;
}

export function DateRangeControl({ defaultValue, value: controlledValue, onChange, className }: DateRangeControlProps) {
  const todayDate = today(getLocalTimeZone());
  // No BDBSA data is ever future-dated, and nothing older than 6 weeks is surfaced here - so
  // that's the entire selectable window, not just the default.
  const minSelectable = todayDate.subtract({ weeks: 6 });
  const maxSelectable = todayDate;

  const [uncontrolledValue, setUncontrolledValue] = useState<DateRange>(
    () => defaultValue ?? { start: startOfWeek(todayDate, "en-AU"), end: todayDate },
  );
  const value = controlledValue ?? uncontrolledValue;

  const setValue = (next: DateRange) => {
    if (!controlledValue) setUncontrolledValue(next);
    onChange?.(next);
  };

  const canGoPrev = value.start.compare(minSelectable) > 0;
  const canGoNext = value.end.compare(maxSelectable) < 0;

  return (
    <div
      className={cx(
        "font-barlow flex w-full items-center gap-1 rounded-lg border border-primary bg-primary py-1.5 pr-2 pl-1.5 shadow-xs sm:w-[260px]",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Previous period"
        disabled={!canGoPrev}
        onClick={() => setValue(shiftRange(value, -1, minSelectable, maxSelectable))}
        className="flex size-6 shrink-0 items-center justify-center rounded text-quaternary transition-colors hover:bg-secondary hover:text-secondary disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft className="size-4" />
      </button>

      <DialogTrigger>
        <AriaButton className="flex flex-1 items-center justify-center gap-1.5 rounded px-1 py-0.5 text-sm font-semibold text-secondary outline-hidden transition-colors hover:bg-secondary">
          <CalendarIcon className="size-4 shrink-0 text-quaternary" />
          <span className="truncate">
            {formatDate(value.start)} – {formatDate(value.end)}
          </span>
        </AriaButton>
        <Popover size="md" className="w-auto p-3">
          <Dialog className="outline-hidden">
            <RangeCalendar value={value} onChange={(next) => next && setValue(next)} minValue={minSelectable} maxValue={maxSelectable}>
              <header className="mb-3 flex items-center justify-between gap-2">
                <AriaButton
                  slot="previous"
                  className={({ isDisabled }) =>
                    cx(
                      "flex size-7 items-center justify-center rounded-md text-quaternary outline-hidden transition-colors hover:bg-secondary",
                      isDisabled && "pointer-events-none opacity-30",
                    )
                  }
                >
                  <ChevronLeft className="size-4" />
                </AriaButton>
                <Heading className="text-sm font-semibold text-primary" />
                <AriaButton
                  slot="next"
                  className={({ isDisabled }) =>
                    cx(
                      "flex size-7 items-center justify-center rounded-md text-quaternary outline-hidden transition-colors hover:bg-secondary",
                      isDisabled && "pointer-events-none opacity-30",
                    )
                  }
                >
                  <ChevronRight className="size-4" />
                </AriaButton>
              </header>
              <CalendarGrid className="border-collapse">
                <CalendarGridHeader>
                  {(day) => (
                    <CalendarHeaderCell className="size-8 text-xs font-medium text-quaternary">{day}</CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className={({ isSelected, isSelectionStart, isSelectionEnd, isDisabled, isOutsideMonth, isFocusVisible }) =>
                        cx(
                          "flex size-8 cursor-pointer items-center justify-center rounded-md text-sm text-primary outline-hidden transition-colors hover:bg-secondary",
                          isSelected && "rounded-none bg-brand-50 text-brand-secondary",
                          (isSelectionStart || isSelectionEnd) && "rounded-md bg-brand-solid text-white hover:bg-brand-solid",
                          isOutsideMonth && "text-quaternary",
                          isDisabled && "pointer-events-none cursor-not-allowed opacity-30 hover:bg-transparent",
                          isFocusVisible && "outline-2 outline-offset-2 outline-brand",
                        )
                      }
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </RangeCalendar>
          </Dialog>
        </Popover>
      </DialogTrigger>

      <button
        type="button"
        aria-label="Next period"
        disabled={!canGoNext}
        onClick={() => setValue(shiftRange(value, 1, minSelectable, maxSelectable))}
        className="flex size-6 shrink-0 items-center justify-center rounded text-quaternary transition-colors hover:bg-secondary hover:text-secondary disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
