## A sorted map that is implemented as a binary tree

The tests for this code require `npm` and `Jest` to be installed on the machine. With that, tests will be fired by issuing

    npm test

from inside the working directory.

The working directory contains a `pre-commit.sh` script. When you create a symbol link to the git pre-commit hook via

    ln -s ../../pre-commit.sh .git/hooks/pre-commit

The Jest tests will be run before any commit. In case the tests fail, a commit will not be possible. In order to make this pre-commit behavior available in Tower for Mac, an `environment.plist` file needs to be created in the `~/Library/Application Support/com.fournova.Tower2` directory. That `environment.plist` needs to contain the `$PATH` setting of your shell. Here is an example how the `environment.plist` could look like:

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
        <key>PATH</key>
            <string>/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
      </dict>
    </plist>
