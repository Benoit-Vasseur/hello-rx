const { UserController } = require("./UserController");
const { UserRepository } = require("./UserRepository");

jest.mock("./UserRepository");

describe("UserController with mock", () => {
  describe("get", () => {
    /*
    The following test is a copy/paste test
    It is the controller code that has been pasted
    Can you imagine a touch of the controller code without breaking this tests ?
    What is the point of this kind of test ?
    */
    it("calls userRepository.get(...)", () => {
      userController = new UserController();
      userRepositotyInstance = UserRepository.mock.instances[0];

      userController.get("Benoit");

      expect(userRepositotyInstance.get).toHaveBeenCalledWith("Benoit");
    });

    describe("user exist", () => {
    /*
    What is the point to mock the repository ?
    because we mocked it we have to unit test it independently
    But what if the repository is just used by this controller
    
    Does this test give us more confidence than an socialble / integration test ?
    Do this group of solitary tests are worth the fact 
    that they are testing implementation's detail
        -> repository API
    Because if we change the implementation of the get
    for example to throw an error instead of returning null
    We also have to change some tests / mocks -> to reflect this new behavior
    We are dealing with our own code like we should deal with tests
    that involve third party libraries / services
    But here we definitively have more control and have access
    to the next link in the chain.
    Be careful to not cut off the chain to short

    So ask yourself, does the test that am i going to write :
        - will give me confidance that it works correctly
            -> you have to define this it, is this it the business feature or is it a "technical detail"
        - will be a good documentation
        - will be resilitent to some refactoring
        -> this point is usually not take into account
        espacially if you are a fan a solitary tests
        But it is important to note that if your test is not resilitent
        to a refactoring it has a good risk to give you or your colleage
        some frustration

    The main frustration of lot of new comers (to tests) is
    to see unexpected red tests.
    And when you are in a project with lot of unit solitary tests
    you definitively are not enthousiast about refactoring (I mean real refactoring not just renaming an attribute in a class)
    because if you re-architecture your implementation you know that lot of tests are going to fail
    (because they are tightly coupled to the current implementation)

    Another point is that I find that we are laking good documentation
    about what business problem our code solve
    unit test are usually not good to serve as business documentation
    Whereas integration tests are more well suited for that
    Longer the chain is better it can describe the business

    We do not want just "business" test
    but it definitevely can be good to have some
    */
      it("returns response with user", () => {
        const expected = { name: "Benoit", age: 27, gender: "M" };
        UserRepository.mockImplementationOnce(() => {
          return { get: () => expected };
        });
        userController = new UserController();
        const user = userController.get("Benoit");
        expect(user).toEqual({ response: expected });
      });

      test("NOT resilient to refactoring", () => {
        const expected = { name: "Benoit", age: 27, gender: "M" };
        UserRepository.mockImplementationOnce(() => {
          return { get: () => expected };
        });
        userController = new UserController();
        userController.get = userController.get2
        const user = userController.get("Benoit");
        /*
        We mock the repository so of course a refactoring about
        how behave the reposity will need to be adapted as well
        */
        expect(user).toEqual({ response: expected });
      })
    });

    describe("user does NOT exist", () => {
      it("returns error", () => {
        UserRepository.mockImplementationOnce(() => {
          return { get: () => undefined };
        });
        userController = new UserController();
        const user = userController.get("Benoit");
        expect(user).toEqual({ error: "NOT_FOUND" });
      });
    });
  });
});
