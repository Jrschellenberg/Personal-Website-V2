const isDebug = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'qa';

let presets = [
  "@babel/preset-env",
  "@babel/preset-react"
];

if(isDebug) {
  presets = [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "69"
        }
      }
    ],
    "@babel/preset-react"
  ];
}

module.exports = {
  "presets": presets,
  "plugins": [
    ["lodash"],
    [
      "@babel/plugin-proposal-object-rest-spread"
    ],
    ["@babel/plugin-proposal-class-properties"],
    [
      "@babel/transform-react-jsx"
    ],

    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]

  ]
}
