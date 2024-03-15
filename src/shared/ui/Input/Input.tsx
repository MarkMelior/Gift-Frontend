'use client';

import { InputProps as NextInputProps, useInput } from '@nextui-org/react';
import { CloseFilledIcon } from '@nextui-org/shared-icons';
import { forwardRef, useMemo } from 'react';

export interface InputProps extends NextInputProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		Component,
		label,
		domRef,
		description,
		isClearable,
		startContent,
		endContent,
		shouldLabelBeOutside,
		shouldLabelBeInside,
		errorMessage,
		getBaseProps,
		getLabelProps,
		getInputProps,
		getInnerWrapperProps,
		getInputWrapperProps,
		getDescriptionProps,
		getErrorMessageProps,
		getClearButtonProps,
	} = useInput({ ...props, ref });

	// eslint-disable-next-line jsx-a11y/label-has-associated-control
	const labelContent = <label {...getLabelProps()}>{label}</label>;

	const end = useMemo(() => {
		if (isClearable) {
			return (
				<span {...getClearButtonProps()}>
					{endContent || <CloseFilledIcon />}
				</span>
			);
		}

		return endContent;
	}, [isClearable, endContent, getClearButtonProps]);

	const innerWrapper = useMemo(() => {
		if (startContent || end) {
			return (
				<div {...getInnerWrapperProps()}>
					{startContent}
					<input {...getInputProps()} />
					{end}
				</div>
			);
		}

		return <input {...getInputProps()} />;
	}, [startContent, end, getInputProps, getInnerWrapperProps]);

	return (
		<Component {...getBaseProps()}>
			{shouldLabelBeOutside ? labelContent : null}
			<div
				{...getInputWrapperProps()}
				role='button'
				tabIndex={0}
				onClick={() => {
					domRef.current?.focus();
				}}
			>
				{shouldLabelBeInside ? labelContent : null}
				{innerWrapper}
			</div>
			{description && <div {...getDescriptionProps()}>{description}</div>}
			{errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
		</Component>
	);
});
