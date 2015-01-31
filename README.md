#rate

A rating system library for JavaScript.

##Getting Started

###Installation

rate can be installed using npm

`npm install rate`

###Initialization

`var rate = requier("rate");`

A new version of each rating system can then be called using

```
var elo = new rate.elo();
var groupElo = new rate.groupElo();
```

The new operator should be used to allow multiple instances of the same rating system within the same function.

##Usage

See [the GitHub wiki](https://github.com/CarlColglazier/rate/wiki) for further documentation.