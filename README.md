# hall of fame
## directory structure
* @shared
   * components
   * services 
* src
   * screens
   * components
   * services
   * utils
   * assets
  
##/shared
include all component and services that can be used in other projects

_it better if we can create an library for this_

[see @shared docs](./@shared/README.md)

 
##/screens
* all screen should be create in this directory
* to create screen first create a folder then create screen file inside in and 
make sure screen file name ends with 'Screen'.
 
##/components
  * include all app specific components.
  * component like **list item component** 
  that ont be used in one screen 
  should be in their screen directory.



#how to add new screen

a simple screen should be like below

```
import {INavigationService} from '@shared';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type ParamsType = {
    
}

export type ScreenNameProps = 
... &
ParamsType

export default class ScreenName extends React.Component<ScreenNameProps> {
    static readonly RouteName = 'ScreenName';

    static start(nav: INavigationService,params:ParamsType) {
        nav.navigate(ScreenName.RouteName,params);
    }

    render() {
        return (
           ...
        )
    }
}


const styles = StyleSheet.create({
    ...
});
```

* should have an static filed for RouteName;

```
  static readonly RouteName = 'ScreenName';
```
*  should have one or more starter method 

        ```typescript
        static start(nav: INavigationService) {
            nav.navigate(ScreenName.RouteName);
        }
        ```
        or start with params
        ```typescript
        static start(nav: INavigationService,params:ParamsType) {
            nav.navigate(ScreenName.RouteName,params);
        }
        ```
##add screen to navigator

wrap screen component in **navigationParamsToProps** HOC
and then add it to AppNavigator routes



#where to add test file
test file should be create beside the test target file and
ends with **.test.tsx** or **.test.ts**


# assets 
[see assets docs](/src/assets/README.md)
