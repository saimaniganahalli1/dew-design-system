"use client";

import type { RefAttributes } from "react";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components";
import { Popover as AriaPopover } from "react-aria-components";
import { cx } from "@/utils/cx";

interface PopoverProps extends AriaPopoverProps, RefAttributes<HTMLElement> {
    /**
     * "sm"/"md"/"lg" apply a preset `max-h-*!` (important, so a plain scrollable option list
     * always respects it). Use "auto" to opt out of any forced max-height - e.g. a popover with
     * its own internal layout (a fixed header/footer around one scrollable region) that needs to
     * size to its content instead of being capped as a whole. A non-"auto" `size` can't be
     * overridden via `className` - `!important` beats a later plain utility of the same property.
     */
    size: "sm" | "md" | "lg" | "auto";
}

export const Popover = (props: PopoverProps) => {
    return (
        <AriaPopover
            placement="bottom"
            containerPadding={0}
            offset={4}
            {...props}
            className={(state) =>
                cx(
                    // font-barlow: AriaPopover portals to a container appended straight to <body>,
                    // outside whatever font-scoping wrapper (e.g. a /pages/* page's
                    // `font-barlow` root div) rendered the trigger - so unlike a normal child, it
                    // can't inherit the font and falls back to the site default (Geist) instead.
                    // Same fix as every other real DEW component (button.tsx, badges.tsx,
                    // checkbox.tsx, tooltip.tsx) baking font-barlow into its own root rather than
                    // relying on inheritance - caught here via a screenshot of ProjectSwitcher's
                    // dropdown rendering in Geist, but the same portal applies to every Popover
                    // consumer (Select, ComboBox, MultiSelect, TagSelect, etc.), doc pages included.
                    "font-barlow w-(--trigger-width) origin-(--trigger-anchor-point) overflow-x-hidden overflow-y-auto rounded-lg bg-primary py-1 shadow-lg ring-1 ring-secondary_alt outline-hidden will-change-transform",

                    state.isEntering &&
                        "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                    state.isExiting &&
                        "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",

                    props.size === "sm" && "max-h-56!",
                    props.size === "md" && "max-h-64!",
                    props.size === "lg" && "max-h-80!",

                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        />
    );
};
