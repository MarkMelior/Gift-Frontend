'use client';

import { InputProps as NextInputProps, useInput } from '@nextui-org/react';
import { CloseFilledIcon } from '@nextui-org/shared-icons';
import cn from 'clsx';
import { forwardRef, memo, useMemo } from 'react';
import cls from './Input.module.scss';

export interface InputProps extends NextInputProps {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
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
				className={cn(getInputWrapperProps().className, cls.wrapper)}
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

export default memo(Input);
