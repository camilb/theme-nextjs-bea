import { LocaleObject, useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import Link, { LinkProps } from 'next/link';
import React, { FunctionComponent, PropsWithChildren } from 'react';

type Props = PropsWithChildren<Omit<LinkProps, 'locale'>> & {
    className?: string;
    forceRefresh?: boolean;
    localeCode?: LinkProps['locale'];
};

// Implementation taken from https://headlessui.dev/react/menu#integrating-with-next-js
const DropdownLink: FunctionComponent<Props> = (props) => {
    const { href, localeCode, children, forceRefresh, ...rest } = props;
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    const localeUrl = localeCode ? getLinkLocaleSlug(LocaleObject.fromAnyCode(localeCode)) : false;

    if (forceRefresh) {
        const hrefWithLocale = localeUrl ? `/${localeUrl}${href.toString()}` : href.toString();

        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <a href={hrefWithLocale} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} locale={localeUrl}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <a {...rest}>{children}</a>
        </Link>
    );
};

export default DropdownLink;
