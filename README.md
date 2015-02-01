# magfest-radios

CLI node app to manage radios for magfest

## Installation

```
npm install magfest-radios
```

Then you need to tell it how many radios you have available. You can do this with a range, or comma-separated values. You can also remove radios if needed.

```
cd magfest-radios
./radio --add 1-100
./radio --remove 55,56,57
```

The `--add` and `--remove` arguments can be shortened to `-a` and `-r`, respectively. To see how many radios are currently in the system, simply type `./radio --list` or `./radio -l`.

## Usage

To start the script, simply type `./radio`.

There are a few options. You can type a number or use arrow-up and arrow-down keys to select the option you want, then press enter. If you make a mistake, you can press `ESC` at any time to go back to the last screen/entry.

### Check out

1. Radio #
2. Name _(allows tab completion on names that have already checked out a radio)_
3. Dept _(allows tab completion)_
4. Phone # _(if user doesn't aready exist)_
5. Badge # _(if user doesn't aready exist)_

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

* departments are version controlled and stored in `data/departments.json`. You currently can't add departments, but this will work in the future
* radios and users are stored in json files in `data/tmp`. Note: Users aren't necessarily tied to a specific department, so that relation isn't stored.
* current checkouts are stored in `data/tmp/checkouts.json`. This data contains radio numbers, user names, department names, and checkout time.
* logs are stored in `data/tmp/logs` by date (e.g. `2015-02-01.log`). Logging is kept to a minimum to save space, but the logfiles are very readable.

Currently it's reading and writing to json for almost everything, and it's doing it synchonously. This is the worst. After basic functionality is added I'll make it async.

## License

Copyright (c) 2015, Nelson Pecora. (MIT License)

See LICENSE for more info.