# suspect

![travis-ci](https://travis-ci.org/Javascipt/suspect.svg)

A package that allows you to deal with files and directories manipulations on case sensitive os. sometimes you need to get read a file that may be had different names on the OS. 

>"On windows, `Readme.md`, `README.md` and `ReadMe.md` are the same, but Linux says NO!" - **someone** from **somewhere**... nevermind!

to solve this problem, you can use this package to get the real name of your file or directory so that you can start writing code that will run on all systems and even on your toaster...! Just kidding, ok, no more jokes, let's get serious!!

### Installation
```sh
    $ npm install suspect
```

### How does it work
Once installed, you can require the module :
```js
    var suspect = require("suspect");
```
you can then use the following methodes:

##### .find(path, callback)
This method finds asynchronously the real name of your file or directory you pass its path as first argument. If you think there can be more than one file, you can check `findAll` method.

```js
    suspect.find('/path/to/file.txt', function (error, realName) {
        if(err) return console.error(err);
        console.log(realName);
    })
```

##### .findSync(path)
If you think you're noob and you don't like asynchronous stuff and callbacks, this one if for you, but you still need to use a try catch! It returns null when the file/dir name doesn't exist. check `findAllSync` if you're looking for all the file/dir names.

```js
    suspect.findSync('/path/to/file.txt');
```

##### .findAll(path, callback)
Its name says everything, it returns an array of all files/dirs names, let's say you look for `file.txt` you can get an array like `['File.txt', 'FILE.txt', ...]`
```js
    suspect.findAll('/path/to/file.txt', function (error, allFilesNames) {
        if(err) return console.error(err);
        console.log(allFilesNames);
    })
```

##### .findAllSync(path)
You can use this method to make a synchronous call and get your array of files/dirs names found on the specified path.
```js
    suspect.findAllSync('/path/to/file.txt');
```


##### .exists(path, callback)
This one is a bit special, if you run `fs.exists("./FILENAME", callback)` or `fs.exists("./fIlEnAmE", callback)` on windows, you probably get `true` even if you have only the file `./FilEnEMe` on your path. However, if you want to check if the name you specified does really exist, then you can use this method
```js
    suspect.exists('/path/to/file.txt', function (error, doesExist) {
        if(err) return console.error(err);
        console.log(doesExist); // outputs true or false
    })
```

##### .existsSync(path)
If you think that there is no need for a callback when you're waiting for a boolean, then here's your function!
```js
    suspect.existsSync('/path/to/file.txt'); // returns true or false
```


## License
MIT