import { Children, cloneElement, ReactElement, ReactNode } from 'react';
import Icon from '../Icon';

type Props = {
  label?: string;
  labelFor?: string;
  help?: string;
  icons?: string[] | null[];
  isBorderless?: boolean;
  isTransparent?: boolean;
  hasTextareaHeight?: boolean;
  children: ReactNode;
  hasError?: boolean;
  errors?: string;
  isTouched?: boolean;
};

const FormField = ({ icons = [], ...props }: Props) => {
  const childrenCount = Children.count(props.children);

  let elementWrapperClass = '';

  switch (childrenCount) {
    case 2:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-2';
      break;
    case 3:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-3';
  }

  let controlClassName = [
    'px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400',
    props.errors && props.isTouched
      ? 'px-3 py-2 max-w-full border-2 border-red-600 rounded w-full dark:placeholder-red-600'
      : '',
    'focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none',
    props.hasTextareaHeight ? 'h-24' : 'h-12',
    props.isBorderless ? 'border-0' : 'border',
    props.isTransparent ? 'bg-transparent' : 'bg-white dark:bg-slate-800',

    ''
  ].join(' ');

  const style = {
    errorMessage: `text-sm text-red-500 mt-2`
  };

  return (
    <div className="mb-6 last:mb-0">
      {props.label && (
        <label
          htmlFor={props.labelFor}
          className={`block mb-2 text-neutral-900 ${
            props.labelFor ? 'cursor-pointer' : ''
          }`}>
          {props.label}
        </label>
      )}
      <div className={`${elementWrapperClass}`}>
        {Children.map(props.children, (child: ReactElement, index) => {
          const hasError = child.props.error;

          // if (hasError) {
          //   controlClassName = `${controlClassName} px-3 py-2 max-w-full border-2 border-red-600 rounded w-full dark:placeholder-red-600`;
          // } else {
          //   controlClassName = `${controlClassName}`;
          // }
          return (
            <div className="relative">
              {cloneElement(child, {
                className: `${controlClassName} ${icons[index] ? 'pl-10' : ''}`
              })}
              {icons[index] && (
                <Icon
                  path={icons[index]}
                  w="w-10"
                  h={props.hasTextareaHeight ? 'h-full' : 'h-12'}
                  className="absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* {props.errors && (
        <span role="alert" className={style.errorMessage}>
          {props.errors}
        </span>
      )} */}
      {props.help && (
        <div className="text-xs text-red-500 dark:text-red-400 mt-1">
          {props.help}
        </div>
      )}
    </div>
  );
};

export default FormField;
