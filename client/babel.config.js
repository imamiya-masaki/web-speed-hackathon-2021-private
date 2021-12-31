module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: 'usage',
      },
    ],
    ["preact"],    
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "h",
        "pragmaFrag": "Fragment",
      }
    ]
  ]
};
