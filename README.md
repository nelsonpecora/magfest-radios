# magfest-radios

CLI node app to manage radios for magfest

## Installation

```
npm install magfest-radios
```

## Usage

To start the script, simply type `./radio`.

There are a few options. You can type a number or use arrow-up and arrow-down keys to select the option you want, then press enter. If you make a mistake, you can press `ESC` at any time to go back to the last screen/entry.

### Check out

1. Radio #
2. Name _(allows tab completion on names that have already checked out a radio)_
3. Dept _(allows tab completion)_
4. Phone #
5. Badge # (new)
6. Notes (new, optional)

### Check in

1. Radio #

### Find radio

* By radio #
* By name (new)
* By dept (new)

**NOTE:** Name and Dept. searches use fuzzy matching, so you don't have to be precise.

### List radios

This will simply display a table of all the radios, including this info:

* Radio #
* name
* dept
* check out time (approx)

### Show Stats

This displays the amount of radios checked out vs. available, and lists how many each department has checked out.

## Technical Details

TBD, but this script will read and write to JSON files, so it's offline-proof.

## License

Copyright (c) 2015, Nelson Pecora. (MIT License)

See LICENSE for more info.