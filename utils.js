global.int = (s) => parseInt(s, 10);
global.log = console.log.bind(console);
global.isArray = arr => Array.isArray(arr);
global.isNumber = n => typeof n === 'number';
global.min = Math.min;
global.max = Math.max;
