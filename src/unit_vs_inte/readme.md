   - type vs non typed
    - unit test "recipes" vs integrqtion test
    - design phase type vs nn type
    - refactoring phase : type vs nn type
    
    - React mechanism (rendering, vDom, reconciliation, ...)
    - Typescript : interface, type, generic, generate type from variable, etc

BatchOperations : create User, duplicate User

controller <- message
    test controller call the right module / service / function with the right parameter
    -> sounds like a unit test
    -> the controller is not tightly coupled to the function it calls, 
    what if you want to refactor the servie / function, you have to change this test but the end feature is the same
    I called that kind of tests "copy/paste" tests -> there q copy paste of the source code but with mock and spy in it.
    If you change one line of your source code you are pretty sure that this test will fail 
    and to make it green you have to copy paste again ...

so let's say that the needs of our app are :
- we want to be able to create a resource
- we want to be able to duplicate a resource
- we want to be able to duplicate and to override some props
- we want to be able to do multiple create and duplicate in one call
- we want a transactionnal option so if one operation fail nothing appen (no side effect)

We have one resource : a user 
    {
        name: "Benoit",
        age: 27,
        gender: "M",
        hobbies: []
    }

so we can create a fresh user 
    -> verify user info, gender is ok, age is positive, hobbies are valid
    -> if valid we save the user
        -> if save OK we respond the new resource
        -> if fail we respond an error message
    -> if not valid we respond the validation errors

we can duplicate a user : we want a custom action for that not make a new with the same info, so :
duplicateUser("Benoit"), duplicateUser("Benoit", {name: "Marie", gender: "F"})
    -> verify that the user we want to duplicate exist
    -> if not respond an error
    -> patch the existing user with the overides (if overrides)
    -> verify new user info
    -> if valid we save it

Bricks involed : 
    - UserRepository <- responsible to duplicate, validation and save

Bricks V2 : 
    - UserRepository
    - UserOverrider
    - UserValidator

Brick V3 : 
    - UserGetter
    - UserFactory
    - UserValidator
    - UserSaver

Bricks V4 :
    - ResourceGetter
    - ResourceDuplicator
    - ResourceValidator
    - ResourceSaver

Getter :
    UserController.get(name)

    1: mocking and "copy/paste test"
        - test the the controller call the repository with the right parameter
        - mock the response of the repository to simulate : 
            - exist -> Controller.get should return the existing
            - do not exist
                - throw an exception -> Controller.get should return null
                - return null -> Controller.get should return null
        - because we mock the repository, it may be nice to unit test the repository

    2: integration test -> add user in store
        - call real Repository :
            - exist -> Controller.get should return the existing
            - do not exisit -> do not care if exception or null -> verify that null is returned

Test the new :
 - validate params
 - create user
 - save user
 or
 - create user
 - validate user
 - save user

New requirements :
    - name has to be uniq
    - can not change gender when duplicate
    - vehicules are a new resource in the system and can be duplicate also

What I would like to show :
 - if unit test the integrational function / controler, refactoring the code will make the test red -> is that we want ?
 - if integration test the test will be more friendly to refactoring but some refacto will make the test red ?
 - With TypeScript : refactoring the code will cost lots of energy ?
