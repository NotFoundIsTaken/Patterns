/**
 * Um carro é um objeto complexo, ele possui várias partes que são necessárias para que ele funcione.
 * Isso significa que ele pode ser montado de diferentes formas, com diferentes partes.
 */
class Car {
  constructor() {
    this.engine = null;
    this.wheels = null;
    this.body = null;
  }
}

/**
 * O Builder é um padrão de projeto de criação que permite que você construa objetos complexos passo a passo.
 */
class CarBuilder {
  constructor() {
    this.car = new Car();
  }

  addEngine(engine) {
    this.car.engine = engine;
    return this; // necessário para encadear as chamadas. ex: new CarBuilder().addEngine("V8").addWheels("Michelin").build();
  }

  addWheels(wheels) {
    this.car.wheels = wheels;
    return this;
  }

  addBody(body) {
    this.car.body = body;
    return this;
  }

  build() {
    return this.car; // apenas no final do processo o carro é retornado
  }
}

/**
 * O padrão permite que você produza diferentes tipos e representações de um objeto usando o mesmo código de construção.
 * Caso você queira, pode montar cada um deles manualmente.
 */
const ferrari = new CarBuilder()
  .addBody("Ferrari")
  .addEngine("V8")
  .addWheels("Michelin")
  .build();

const porsche = new CarBuilder()
  .addBody("Porsche")
  .addEngine("V6")
  .addWheels("Continental")
  .build();

const tesla = new CarBuilder()
  .addBody("Tesla")
  .addEngine("Electric")
  .addWheels("Michelin")
  .build();

console.log(ferrari);
console.log(porsche);
console.log(tesla);

/**
 * Também é possível definir a criação de forma automática, usando uma classe de diretor.
 */
class CarDirector {
  constructSportCar(builder) {
    return builder
      .addBody("Ferrari")
      .addEngine("V8")
      .addWheels("Michelin")
      .build();
  }

  constructSUV(builder) {
    return builder
      .addBody("Tesla")
      .addEngine("Electric")
      .addWheels("Michelin")
      .build();
  }
}

const carDirector = new CarDirector();
const newFerrari = carDirector.constructSportCar(new CarBuilder());
const newTesla = carDirector.constructSUV(new CarBuilder());

console.log(newFerrari);
console.log(newTesla);

/**
  Uma observação interessante é que cada novo carro deve ser uma nova instancia de CarBuilder.
  Caso o contrário, o carro anterior será sobrescrito.
*/

const carBuilderInstance = new CarBuilder();

const car1 = carBuilderInstance.addBody("Ferrari").build();
const car2 = carBuilderInstance.addBody("Tesla").build();
const car3 = carBuilderInstance.addBody("Porsche").build();

/**
 * Nesse caso, todos os carros serão iguais, pois o mesmo objeto foi usado para construí-los.
 * Esse não é um problema do padrão, mas algo comum em orientação a objetos.
 */
console.log(car1 === car2 && car2 === car3); // true
