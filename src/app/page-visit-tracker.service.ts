import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PageVisitTrackerService {
  constructor(private router: Router) {}


  trackPageVisit(role: any) {
    
    console.log(role);

    if (role.role === 'member') {
      let localData: any = localStorage.getItem('visited page');
      localData = JSON.parse(localData);
      if (localData) {

        //updating value to existing user  
        let existingUser = false;
        localData = localData.map((user: any) => {
          if (user.username === role.username) {
            existingUser = true;
            user.count += 1;
            user.time = new Date().toLocaleString();
            // user.page = [...user.page, 'Home']
          }

          return user;
        });

        let tempData: any[] = [];


        if (!existingUser) {  // if a new user is added
          tempData = [
            {
              username: role.username,
              role: role.role,
              count: 1,
              time: new Date().toLocaleString(),
             // page: ['Home']
            },
          ];
        }

        // set item for both
        localStorage.setItem(
          'visited page',
          JSON.stringify([...localData, ...tempData])
        );
      } else {

        // for empty data source add a new user
        localStorage.setItem(
          'visited page',
          JSON.stringify([
            {
              username: role.username,
              role: role.role,
              count: 1,
              time: new Date().toLocaleString(),
              //page: ['Home']
            },
          ])
        );
      }
      
    }
  }
}
