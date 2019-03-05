const { UserRepository } = require("./UserRepository");

class UserController {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  get(name) {
    const user = this.UserRepository.get(name);
    return user ? { response: user } : { error: "NOT_FOUND" };
  }

  get2(name) {
    try {
      return { response: this.UserRepository.get2(name) };
    } catch (e) {
      return { error: "NOT_FOUND" };
    }
  }

  create(userParams) {
    this.UserRepository.create(userParams);
  }

  create2(userParams) {
    this.UserFactory.create(userParams);
    this.UserValidator.validate(user);
    this.UserRepository.save(user);
  }

  duplicate(username, overides = {}) {
    this.UserRepository.get(username);
    this.UserFactory.overides(user, overides);
    this.UserValidator.validate(user);
    this.UserRepository.save(user);
    /*
    Seems a clean code and I hope that it is
    It is well suited for unit test (pure function)
    But do I really need to unit test individually those functions
    they are not used alsewhere and i am not building neither 
    a validation library
    neither a overider libray
    It is my implementation  detail of today
    If just do integration / sociable tests I am testing all the cases
    I document the business logic
    I have confidnace that my problem is well adressed
    And my tests will be resilient to refactoring because my chain is longer
    It is the longest possible chain to stay in "code" test
    So tests are quick and they gave my confidence in my code

    In this kind of situation I am definitevely happy with 0 unit test
    Unit test will just test method that can be change / delete
    because they are implementation detail for one specific problem
    qnd they would even biaise me for future evolution / refactoring
    because well they are tested so I will try to resue them qs much qs I can
    And begin to make soem generic pattern around those etc

    So it is even a bad idea in this kind of situation I would say
    Your details are here just for one problem and may be this code
    will change when you will design a more generic pattern that
    I will actually use in multiple place
    Do not make generic things before we actually need them
    Try to predic the future is a bad idea
    and unit testing those fucntion can be seen somehow on a first step to this
    Oh I have a pattern here, I have some tests,
    I "have to" reuse this wonderfull code / work
    */
  }
}

module.exports = { UserController };
