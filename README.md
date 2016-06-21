# Installation Ubuntu 14.04 LTS (React-Native for Android)

Sources:

[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-linux/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-linux/)

[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

[https://facebook.github.io/react-native/docs/getting-started.html](https://facebook.github.io/react-native/docs/getting-started.html)

## MongoDB

### Installation

Import the public key used by the package management system.

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

Create a list file for MongoDB.

    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

Reload local package database

    sudo apt-get update

Install the MongoDB packages

    sudo apt-get install -y mongodb-org

### Masterkey for your app
	MasterKey for parse-server: asdf
###a ppId
 	StudentWGPlanner

### mongodb-runner 	
mongodb-runner start
parse-dashboard --appId StudentWGPlanner --masterKey asdf --serverURL "http://localhost:1337/parse" --appName StudentWGPlanner
parse-server --appId StudentWGPlanner --masterKey asdf

    
    
Creation following tables:
    wgs
    |-----------------------------------------------------------------------------------------------------|
    | objectId (String) | updatedAt (Date) | createdAt (Date) | ACL (ACL) | name (String) | users (Array) |
    |-----------------------------------------------------------------------------------------------------|
    
    shoppinglistitem
    |--------------------------------------------------------------------------------------------------------------------|
    | objectId (String) | updatedAt (Date) | createdAt (Date) | name (String) | state (Number) | shoppinglistid (String) |
    |--------------------------------------------------------------------------------------------------------------------|
    
    shoppinglist
    |-----------------------------------------------------------------------------------------------------|
    | objectId (String) | updatedAt (Date) | createdAt (Date) | ACL (ACL) | name (String) | wgid (String) |
    |-----------------------------------------------------------------------------------------------------|
    
    User
    |-------------------------------------------------------------------------------------------------
    | objectId (String) | emailVerified (Boolean) | ACL (ACL) | updatedAt (Date) | authData (Object) |
    |-------------------------------------------------------------------------------------------------
                        ----------------------------------------------------------------------------|
                        | username (String) | createdAt (Date) | password (string) | email (String) |
                        ----------------------------------------------------------------------------|
                        
    Session                        
    |-------------------------------------------------------------------------------------------------------------------
    | objectId (String) | sessionToken (String) | expiresAt (Date) | ACL (ACL) | user (KEINEAHNUNG) | updatedAt (Date) |
    |-------------------------------------------------------------------------------------------------------------------
                        -------------------------------------------------------------------------------------------|
                        | createdWith (Object) | installationId (String) | restricted (Boolean) | createdAt (Date) |
                        -------------------------------------------------------------------------------------------|
                        
### Run MongoDB

Start MongoDB

    sudo service mongod start

Verify that MongoDB has started successfully

    [initandlisten] waiting for connections on port <port>

The port should be 27017, otherwise write your port down for later

## React-Native

### Installation

**Install node version manager**

cURL

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash

Wget

    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash

The script clones the nvm repository to ~/.nvm and adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

You can customize the install source, directory and profile using the NVM_SOURCE, NVM_DIR, and PROFILE variables. Eg: curl ... | NVM_DIR="path/to/nvm" bash

Note: On OS X, if you get nvm: command not found after running the install script, your system may not have a [.bash_profile file] where the command is set up. Simply create one with touch ~/.bash_profile and run the install script again.

**Verify Installation**

    command -v nvm

This command should print nvm. Don't continue the installation, try to fix the nvm installation with the original install instruction at [https://github.com/creationix/nvm](https://github.com/creationix/nvm)

**Install node.js**

    nvm install 5.10

**Install React-Native command line tools**

    npm install -g react-native-cli

If you see the error, **EACCES: permission denied**, please run the command: sudo npm install -g react-native-cli.

**Install Android Studio 2.0 or higher**

[https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

Open the SDK Manager. In the SDK Platforms window, choose Show Package Details and under Android 6.0 (Marshmallow), make sure that Google APIs, Intel x86 Atom System Image, Intel x86 Atom_64 System Image, and Google APIs Intel x86 Atom_64 System Image are checked. We used Google APIs 23.1

| Name                                        | API Level | Revision |
|---------------------------------------------|-----------|----------|
| Google APIs                                 | 23        | 1        |
| Android SDK Platform 23                     | 23        | 3        |
| Sources for Android SDK                     | 23        | 1        |
| Intel x86 Atom System Image                 | 23        | 9        |
| Intel x86 Atom_64 System Image              | 23        | 9        |
| Google APIs Intel x86 Atom System Image     | 23        | 13       |
| Google APIs Intel x86 Atom_64 System Image  | 23        | 13       |

**In the SDK Tools window, choose Show Package Details and under Android SDK Build Tools, make sure that Android SDK Build-Tools 23.0.1 is selected.**

| Name                            | Version |
|---------------------------------|---------|
| Android SDK Build-Tools 23.0.1  | 23.0.1  |

**MAKE SURE THAT YOU INSTALL EXACTLY THIS VERSION**

After this ensure that the **ANDROID_HOME** environment variable points to your existing Android SDK.

To do that, add this to your ~/.bashrc, ~/.bash_profile (or whatever your shell uses) and re-open your terminal:

    # If you installed the SDK without Android Studio,
    # then it may be something like:
    # /usr/local/opt/android-sdk

    # Generally with Android Studio, the SDK is installed here...
    export ANDROID_HOME=~/Android/Sdk

## Clone and run this repo

    git clone https://github.com/barbara-gigerl/StudentWGPlanner
    cd StudentWGPlanner
    npm install

Now start your Android emulator, then run this commands to build and start the project

    react-native start
    react-native run-android
    npm start

You may need to reload the JS within the app
