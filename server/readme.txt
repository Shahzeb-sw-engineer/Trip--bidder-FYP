User Registeration Process:
1.  User will be registered by calling register API.
2.  In register API the new token will be generated and saved in db.
3.  The token along with the user id will be sent to user email for verification.
4.  After user clicking on verify link, his token and userid will be sent to /verify API.
5.  The verify API will check if the userid and token sent by user through verify API are valid
    ie. exsits in db.
        - if it exists user status will be set to true and token will be deleted.
        - else user status (isVerified) will not be true.
6.  Then the program should call addNewUser api and add user info in collection related to his role.