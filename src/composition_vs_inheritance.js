(function inheritance() {
    console.log("--- INHERITANCE ---")
    class Animal {
      constructor(name) {
        this.name = name
      }
      poo() {
        console.log(this.name, "poo")
      } 
    }
  
    class Dog extends Animal {
      bark() {
        console.log(this.name, "ouf !")
      }
    }
  
    class Cat extends Animal {
      meow() {
        console.log(this.name, "meeeewwww")
      }
    }
  
    class Robot {
      drive(durationInHour) {
        this.position = this.position + this.speedInKmPerHour * durationInHour
      }
    }
  
    class CleaningRobot extends Robot {
      clean() {
        console.log("cleaning")
      }
    }
  
    class HugerRobot extends Robot {
      hug() {
        console.log("hug the nearest Animal")
      }
    }
  
    /* we want a HugerRobotDog
    so how do we adapt our class hierarchy 
    to handle this new comer which can :
      - hug
      - drive
      - bark
      BUT CAN NUT poo, it is a robot
  
      The cleanest way to do it while staying with this hierarchy 
      is to make a child of the HugerDog 
      and duplicate the bark function of the dog class
  
    */
  
    class HugerRobotDog extends HugerRobot {
      bark() {
        // Robot hierarchy does not have a name so it should be a custom one 
        // console.log(this.name, "ouf !")
        console.log("ouf of a robot")
      }
    }
  
    const Boul = new Dog("Boul")
    Boul.poo()
    Boul.bark()
  
    const blender = new HugerRobot()
    blender.hug()
  
    const robotDog = new HugerRobotDog()
    robotDog.bark()
  })()
  
  ;(function composition() {
    console.log("--- COMPOSITION ---")
    const barker = (state) => ({
      bark: () => console.log("Woof, I am " + state.name)
    })
  
    const driver = (state) => ({
      drive: (durationInHour) => state.position + state.speedInKmPerHour * durationInHour
    })
  
    const huger = state => ({
      hug: () => console.log("Comp hug the farest animal")
    })
  
    const hugerRobotDog = (name) => {
      const state = {
        name,
        speedInKmPerHour: 100,
        position: 0
      }
  
      return Object.assign({}, barker(state), driver(state), huger(state))
    }
  
  barker({name: "CompDog"}).bark()
  const compHugerRobotDog = hugerRobotDog("compHuger")
  compHugerRobotDog.bark()
  
  })()
  
  /*
Inheritance is when you design your types around what they are
While Composition is when you design your types around what they do

SO when should we use composition and when should we use inheritance ?

Some says that we should use inheritance when it is a "is" relation :
like Benoit is a man, or a dog is an Animal
And use composition when it is a "have" relation :
like Benoit has arme or a dog have the ability to bark

But as wz saw in our example a "is" relation can be express in a "have" relation (and vice versa).
So those rules do not make lot of sense and do not help that much.
When we do inheritance we can easily be trap in trying to predict the future 
and because the future is never like we expected the design expressed by inheritance is harder to adapt 
and we may fall into this weird / hard choices like the hugerRobotDog

So try composition, it is a design that is more flexible than a hierarchy tree
  */