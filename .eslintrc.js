module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: [
            'error',
            4
        ],
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'space-before-function-paren': [
            0,
            'always'
        ],
        semi: [
            'error',
            'always'
        ],
        'no-useless-escape': 0,
        'no-extend-native': 0,
        'vue/no-async-in-computed-properties': 0,
        'no-undef': 0,
        'no-redeclare': 0,
        'padded-blocks': 0,
        'no-self-assign': [
            'off',
            {
                props: false
            }
        ],
        'space-in-parens': 0,
        'object-curly-spacing': [
            0,
            'never'
        ],
        'no-unused-vars': 0,
        'spaced-comment': 0,
        'no-constant-condition': 0,
        'no-return-assign': 0,
        'no-unused-expressions': 0,
        'no-useless-return': 0,
        'no-template-curly-in-string': 0,
        'no-parsing-error': 0,
        'vue/no-parsing-error': [
            2,
            {
                'x-invalid-end-tag': false
            }
        ],
        camelcase: [
            0,
            {
                properties: 'always'
            }
        ]
    }
};
