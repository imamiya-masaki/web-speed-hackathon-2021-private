module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        "targets": {
          "browsers": ["last 1 Chrome versions"]
        }
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
