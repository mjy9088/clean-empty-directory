# clean-empty-js

`clean-empty-js` is a Node.js CLI tool written in TypeScript that removes JavaScript files which contain only the empty output of `tsc`.

## Usage

After running `tsc`, run the following command:

```shell
npx clean-empty-js "dist/**/*.js"
```

This will remove JavaScript files without meaningful content, keeping your build directory clean.
