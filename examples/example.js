'use strict';

const {DIContainer} = require('../');

//init names
const IService1 = Symbol('IService1');
const IService2 = Symbol('IService2');
const IService3 = Symbol('IService3');

//init providers
const provider1 = {
  imports: [],
  factory: () => {
    console.dir(`${1} : ${'nothing'}`);
    return 1;
  },
};

const provider2 = {
  imports: [IService1],
  factory: ({[IService1]: service1}) => {
    console.dir(`${2} : ${service1}`);
    return 2;
  },
};

const provider3 = {
  imports: [IService1, IService2],
  factory: ({[IService1]: service1, [IService2]: service2}) => {
    console.dir(`For transient example: ${Date.now()}`);
    console.dir(`${3} : ${[service1, service2]}`);
    return 3;
  },
};

const container = new DIContainer()
  .addSingleton(IService1, provider1)
  .addSingleton(IService2, provider2)
  .addTransient(IService3, provider3)
  .build();

const {[IService1]: s1, [IService2]: s2, [IService3]: s3} = container;
console.dir({s1, s2, s3});

//transient example
//The factory is called every time a dependency is accessed
setTimeout(() => {
  const {[IService3]: s3_2} = container;
  return s3_2;
}, 1000);
