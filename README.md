# ShoppingcarServices

## Services

### shoppingcar-service

```
$ nx serve shoppingcar-service --verbose
```
### shoppingcar-web
```
$ nx serve shoppingcar-web --verbose
```
### Shoppingcar-app

```
$ nx start shoppingcar-app --verbose
$ nx run-ios shoppingcar-app --verbose
$ nx run-android shoppingcar-app --verbose
```

# Trouble shotting

![spreadpropserror](./assets/spreadpropserror.png)

```
I made a modification to the "renderTouchable" function in the file and it solved the problem.

To find the file in the project, navigate to:
node_modules/react-native-paper/src/components/BottomNavigation/BottomNavigationBar.tsx

Look for this:

renderTouchable = (props: TouchableProps<Route>) => <Touchable {...props} />,
and replace it with:

renderTouchable = ({ key, ...props }: TouchableProps<Route>) => <Touchable key={key} {...props} />,
```