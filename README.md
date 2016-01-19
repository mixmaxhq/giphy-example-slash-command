# Color Slash Command for Mixmax

Using Mixmax `/color` command shows posibble colors and shows a box with hex/rgb values

- Command: `/color`
- Input: valid hex color. In example "#fa"
- Output:

![http://i.imgur.com/uJgN1Vm.png]()
![http://i.imgur.com/ytev2Jj.png]()

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl http://localhost:9145/typeahead?text=#fa
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9145/resolver?text=#faccca
```
