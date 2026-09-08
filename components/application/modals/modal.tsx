"use client";

import type { FC, FormEvent, ReactNode } from "react";
import { AlertTriangle, HelpCircle } from "@untitledui/icons";
import type { DialogProps as AriaDialogProps, ModalOverlayProps as AriaModalOverlayProps } from "react-aria-components";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Form as AriaForm, Heading as AriaHeading, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

export const DialogTrigger = AriaDialogTrigger;

export const ModalOverlay = (props: AriaModalOverlayProps) => {
    return (
        <AriaModalOverlay
            {...props}
            className={(state) =>
                cx(
                    "fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center bg-overlay/70 px-4 outline-hidden backdrop-blur-[6px] sm:items-center sm:justify-center sm:px-8",
                    // Vertical padding
                    "pt-(--modal-pt) pb-(--modal-pb) [--modal-pb:clamp(16px,8vh,64px)] [--modal-pt:16px] sm:[--modal-pb:32px] sm:[--modal-pt:32px]",
                    // Animations
                    state.isEntering && "duration-300 ease-out animate-in fade-in",
                    state.isExiting && "duration-200 ease-in animate-out fade-out",
                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        />
    );
};

export const Modal = (props: AriaModalOverlayProps) => (
    <AriaModal
        {...props}
        className={(state) =>
            cx(
                "rounded-xl bg-primary align-middle shadow-xl outline-hidden max-sm:overflow-y-auto sm:rounded-2xl",
                // Max height based on parent's vertical padding
                "max-h-[calc(var(--visual-viewport-height)-var(--modal-pt)-var(--modal-pb))]",
                // Animations
                state.isEntering && "duration-300 ease-out animate-in zoom-in-95",
                state.isExiting && "duration-200 ease-in animate-out zoom-out-95",
                typeof props.className === "function" ? props.className(state) : props.className,
            )
        }
    />
);

export const Dialog = (props: AriaDialogProps) => (
    <AriaDialog
        {...props}
        // font-barlow: Modal/ModalOverlay portal to a container appended straight to <body>,
        // outside whatever font-scoping wrapper rendered the trigger - so like Popover
        // (see components/base/select/popover.tsx), it can't inherit the font and falls
        // back to the site default (Geist) instead.
        className={cx("relative max-h-[inherit] w-full overflow-y-auto font-barlow outline-hidden", props.className)}
    />
);

interface ConfirmationModalProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    /** @default HelpCircle */
    icon?: FC<{ className?: string }>;
    title: string;
    description?: ReactNode;
    /** @default "Confirm" */
    confirmLabel?: string;
    /** @default "Cancel" */
    cancelLabel?: string;
    onConfirm?: () => void;
    isConfirmLoading?: boolean;
}

/** Neutral "are you sure?" prompt for a reversible or low-stakes action. */
export const ConfirmationModal = ({
    isOpen,
    onOpenChange,
    icon: Icon = HelpCircle,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    isConfirmLoading,
}: ConfirmationModalProps) => (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={!isConfirmLoading}>
        <Modal className="w-full max-w-xs">
            <Dialog>
                <div className="flex flex-col gap-4 p-6">
                    <div className="flex items-start justify-between">
                        <FeaturedIcon icon={Icon} color="brand" theme="light" size="lg" />
                        <CloseButton size="sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                            {title}
                        </AriaHeading>
                        {description && <p className="text-sm text-tertiary">{description}</p>}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                        <Button color="secondary" size="lg" slot="close">
                            {cancelLabel}
                        </Button>
                        <Button color="primary" size="lg" isLoading={isConfirmLoading} onPress={onConfirm}>
                            {confirmLabel}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </Modal>
    </ModalOverlay>
);

interface DestructiveModalProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    /** @default AlertTriangle */
    icon?: FC<{ className?: string }>;
    title: string;
    description?: ReactNode;
    /** @default "Delete" */
    confirmLabel?: string;
    /** @default "Cancel" */
    cancelLabel?: string;
    onConfirm?: () => void;
    isConfirmLoading?: boolean;
}

/** Warns before an irreversible action (delete, remove, revoke). Confirm button uses the destructive colour. */
export const DestructiveModal = ({
    isOpen,
    onOpenChange,
    icon: Icon = AlertTriangle,
    title,
    description,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    onConfirm,
    isConfirmLoading,
}: DestructiveModalProps) => (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={!isConfirmLoading}>
        <Modal className="w-full max-w-xs">
            <Dialog>
                <div className="flex flex-col gap-4 p-6">
                    <div className="flex items-start justify-between">
                        <FeaturedIcon icon={Icon} color="error" theme="light" size="lg" />
                        <CloseButton size="sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                            {title}
                        </AriaHeading>
                        {description && <p className="text-sm text-tertiary">{description}</p>}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                        <Button color="secondary" size="lg" slot="close">
                            {cancelLabel}
                        </Button>
                        <Button color="primary-destructive" size="lg" isLoading={isConfirmLoading} onPress={onConfirm}>
                            {confirmLabel}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </Modal>
    </ModalOverlay>
);

interface FormModalProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    title: string;
    description?: ReactNode;
    /** Form fields - typically `Input`/`Checkbox`/etc. from `components/base`. */
    children: ReactNode;
    /** @default "Save" */
    submitLabel?: string;
    /** @default "Cancel" */
    cancelLabel?: string;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    isSubmitLoading?: boolean;
    /** @default "md" */
    size?: "sm" | "md" | "lg";
}

const formModalSizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
};

/**
 * General-purpose modal shell for arbitrary content - most commonly a form.
 * Unlike `ConfirmationModal`/`DestructiveModal` it takes free-form `children`
 * instead of a fixed icon+description layout.
 */
export const FormModal = ({
    isOpen,
    onOpenChange,
    title,
    description,
    children,
    submitLabel = "Save",
    cancelLabel = "Cancel",
    onSubmit,
    isSubmitLoading,
    size = "md",
}: FormModalProps) => (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={!isSubmitLoading}>
        <Modal className={cx("w-full", formModalSizes[size])}>
            <Dialog>
                <AriaForm
                    className="flex flex-col gap-5 p-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit?.(e);
                    }}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                {title}
                            </AriaHeading>
                            {description && <p className="text-sm text-tertiary">{description}</p>}
                        </div>
                        <CloseButton size="sm" />
                    </div>

                    <div className="flex flex-col gap-4">{children}</div>

                    <div className="mt-2 grid grid-cols-2 gap-3">
                        <Button color="secondary" size="lg" slot="close" isDisabled={isSubmitLoading}>
                            {cancelLabel}
                        </Button>
                        <Button type="submit" color="primary" size="lg" isLoading={isSubmitLoading}>
                            {submitLabel}
                        </Button>
                    </div>
                </AriaForm>
            </Dialog>
        </Modal>
    </ModalOverlay>
);
