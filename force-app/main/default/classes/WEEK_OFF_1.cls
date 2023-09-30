Public class Week {
    public void create(List<WEEK_OFF__C>  wK){
        
        for(WEEK_OFF__C  aW : wK){
                     //  Datetime my=w.DATE__c;
       // string mydatetime=my.format('EEE, MMM d yyyy HH:mm:ss'); 
                       // w.SHOW_TIME__c=my.format('MMM yyyy');
           // string abcd=w.SHOW_TIME__c;
                Date mydate=aW.DATE__c;
       //  string mydatetime=mydate.format('EEE, MMM d yyyy HH:mm:ss');           
          Date first=mydate.toStartOfMonth();
          integer today=mydate.day();
        integer month=mydate.month();
          integer day=mydate.day();
        integer year=mydate.year();
        integer daysinmonth=Date.daysInMonth(year, month);
          integer abc=math.mod(year , 4);  
           // if(abc==0){w.LY_NLY__c='Leap Year';}else{w.LY_NLY__c='Non Leap Year';}
          integer a=0;
          integer b=0;
          integer c=0;
          integer d=0;
          integer e=0;
          integer f=0;
          integer g=0;
          integer h=0;
          integer i=0;
          integer k=0;
          integer ab=0;
          integer cd=0;
          for(integer z=1 ;z<=daysinmonth ; z++){
              
               date king=Date.newInstance(year, month, z);
                            date      p= king.toStartOfWeek();
               Date aJ=Date.newInstance(year, month, z);
              if(z==7){ if(z<=today){
                 Date q=aJ.toStartOfMonth();
                  Date r=aJ.toStartofWeek();
                 Date s=aJ.toStartOfWeek()-1; 
                  
                    if(r==aJ.toStartofWeek() ){
                      a=1; }if(aJ.toStartOfMonth()<=aJ.toStartOfWeek()-1){
                      b=1;
                      }
             
                 // y.END_DATE__c;
                 // a.HOLYDAYS__c=i; 
                  }
             //  date      h= king.toStartOfWeek();
                     // b=i;}
              }else if(z==14){
                   Date t=aJ.toStartofWeek();
                  
                 Date u=aJ.toStartOfWeek()-1; 
                  if(t==aJ.toStartofWeek() ){
                      c=1; }if(u==aJ.toStartOfWeek()-1){
                      d=1;
                      }

              }
              else if(z==21){ Date v=aJ.toStartofWeek();
                
                 Date x=aJ.toStartOfWeek()-1; 
                  if(v==aJ.toStartofWeek() ){
                      e=1; }if(x==aJ.toStartOfWeek()-1){
                      f=1;
                      }
                            }else if(z==28){ Date n=aJ.toStartofWeek();
                  
                 Date o=aJ.toStartOfWeek()-1; 
                  if(n==aJ.toStartofWeek() ){
                      g=1; }if(o==aJ.toStartOfWeek()-1){
                      h=1;
                      }
              }else if(z==30){ Date l=aJ.toStartofWeek();
                  
                 Date m=aJ.toStartOfWeek()-1; 
                              // y.END_DATE__c=m;
                              if(aJ.toStartOfWeek()==aJ.toStartOfMonth()+29)        
                              { if(l==aJ.toStartofWeek()){i=1;}if(m==aJ.toStartOfWeek()-1){k=1;}}
                              else if(aJ.toStartOfWeek()==aJ.toStartOfMonth()+28)        
                              { if(l==aJ.toStartofWeek()){i=1;}if(m==aJ.toStartOfWeek()-1){k=1;}}
                              else if(aJ.toStartOfWeek()==aJ.toStartOfMonth()+29){
                      i=1; }if(aJ.toStartOfWeek()+6==aJ.toStartOfMonth()+29){
                      k=1;
                      }else if(aJ.toStartOfWeek()==aJ.toStartOfMonth()+28 ){
                      i=1; }if(aJ.toStartOfWeek()+6==aJ.toStartOfMonth()+28){
                      k=1;
                      }
              }else if(z==31){ Date ef=aJ.toStartofWeek();
               // y.END_DATE__c=ef;
                 Date gh=aJ.toStartOfWeek()-1; 
                              if(aJ.toStartOfWeek()==aJ.toStartOfMonth()+30) {ab=1;}
             
                              else if(aJ.toStartOfWeek()+6==aJ.toStartOfMonth()+30) {ab=1;} 
          else  if(aJ.toStartOfWeek()-1==aJ.toStartOfMonth()+29)  {
                      cd=1;
                     
                      }
                   }
        Wa.MONTH_HOLIDAY__c=a+b+c+d+e+f+g+h+i+k+ab+cd;
           }
         
        }
    }
   
    }