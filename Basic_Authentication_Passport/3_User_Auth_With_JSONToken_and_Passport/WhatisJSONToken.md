*****************************************
        JSONWEBTOKEN NODE MODULE
        npm install jsonwebtoken --save
        
        *** METHODS PROVIDED ***
        - sign() for signing and issuing token
        - verify() for verifying and decoding
        token and making available on the
        requets property in Express


        PASSPORT-JWT NODE MODULE
        npm install passport-jwt --save

        *** METHODS PROVIDED ***
        - Passport strategy for authenticating using JWT
        - Authenticate RESTful endpoints using JWT w/o
        needing sessions
        - Extract JWT from an incoming request
        (Header, body, url query param)

*****************************************


1.) User Requests access w/ username and password
2.) Server validates credentials
3.) Server creates a signed and sends it to the client
4.) All subsequent requests from the client should include token
5.) Server verifies the token and responds with data if validated

JSON Web Token
- Simple way of encoding information in a token to pass to the client side

THREE PARTS OF A JSON WEB TOKEN
Header
    - Contains the algorithm to encode information (256bit)

Payload
    - Carries info about user to identify user

Signature
    - A secret key on the server side which is used for encoding the JSON Web Token