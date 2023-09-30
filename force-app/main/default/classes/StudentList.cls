public with sharing class StudentList {
    public List<Student> std {set;get;}
    @AuraEnabled(cacheable=true)
    public static List<Student> students(){
        List<Student> std=new List<Student>();
        Student std1=new Student();
        std1.firstName='suresh';
        std1.lastName='kumar';
std.add(std1);
        return std;
    }
}