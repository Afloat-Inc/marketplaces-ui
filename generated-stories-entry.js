/* eslint-disable */

'use strict'

const _frameworkImportPath = require('@storybook/vue');

(0, _frameworkImportPath.configure)([require.context('./src', true, /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.mdx)$/), require.context('./src', true, /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx))$/)], module, false)
