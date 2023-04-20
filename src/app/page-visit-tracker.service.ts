import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PageVisitTrackerService {
  constructor(private router: Router) { }



  //if the updated time and count of every user login required 

  trackPageVisit(role: any) {

    console.log(role);

    if (role.role === 'member') {
      let localData: any = localStorage.getItem('visited page');
      localData = JSON.parse(localData);
      console.log(localData, 'localData');

      let tempData: any[] = [];
      if (localData) {   // if users available on localstorage

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


      }
      else {

        // for empty data source add a new user
        localData = [];
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


      // update localstoarge here
      localStorage.setItem(
        'visited page',
        JSON.stringify([...localData, ...tempData])
      );


    }
  }


  //if the time every user login required 

  _trackPageVisit(role: any) {

    console.log(role);

    if (role.role === 'member') {
      let localData: any = localStorage.getItem('visited page');
      localData = JSON.parse(localData);
      if (localData == null) {
        localData = [];
      }

      
      let tempData: any[] = [];
      tempData = [
        {
          username: role.username,
          role: role.role,
          count: 1,
          time: new Date().toLocaleString(),
          // page: ['Home']
        },
      ];


      // update localstoarge here
      localStorage.setItem(
        'visited page',
        JSON.stringify([...localData, ...tempData])
      );


    }
  }
}
