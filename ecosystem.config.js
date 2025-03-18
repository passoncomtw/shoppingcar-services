module.exports = {
  apps : [{
    name: 'shoppingcar-service',
    script: 'npx nx serve shoppingcar-service',
    watch: false,
    env_prod: {
      'NODE_ENV': 'prod',
    },
  },{
    name: 'shoppingcar-web',
    script: 'npx nx serve shoppingcar-web',
    watch: false,
    env_prod: {
      'NODE_ENV': 'prod',
    },
  }]
};