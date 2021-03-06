import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Http, Response} from 'angular2/http';
import {Injectable, Component } from 'angular2/core';
import {Router,RouteParams} from 'angular2/router';

declare var Auth0Lock;

@Component({
  selector: 'signup',
  templateUrl: 'dev/home/signup.component.html',
  directives: [ROUTER_DIRECTIVES],
})
export class SignupComponent implements OnInit {

 private data;
 
 constructor(private http:Http, private _router: Router,private _routeParams: RouteParams) {}

Home(event) {
			event.preventDefault();
			this.router.navigate(['Home']);
			}
  registerUser(user) {
  var ths=this;
  var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
  var error='1';
   $("#registrationForm input:text").each(function()
			{
			if(this.value=='')
				{
					$(this).addClass("error");
					error++;
				}else{
					$(this).removeClass("error");
					$('.error_text').hide();
				}
			});
			if($('#password').val()==''){
			$('#password').addClass("error");
			 error++;
			}
  if(!pattern.test($('#email').val()))
        {
          $('#email').addClass("error");
		  error++;
		  
        }else{
		$('#email').removeClass("error");
		}
	  
	  if(error=='1'){
	  $("#registrationForm_sub").attr("disabled", "disabled");
	  $.ajax({
          url:'./api/users/signup',
          type: "POST",
          data: $("#registrationForm").serialize(),
          beforeSend:function()
          {
            //$(".login_page .loading").fadeIn();
          },
          success: function(response)
          {
		   $("#registrationForm_sub").removeAttr("disabled");
		  var obj = $.parseJSON(response);
						if(obj.status=="success")
						{
							ths._router.navigate(['/SignupNextStep', { id: obj.id, name: $('#name').val(),industry:$('#industry').val(),image:'' }]);
						}
						else if(obj.status=="error")
						{
						return false;
						}
            
            }
  
        });
		}else{return false;}
  } 
  ngOnInit() {
  $('#location').val(this._routeParams.get('locationid'));
  $('#desk').val(this._routeParams.get('desk'));
  this.locationid=this._routeParams.get('locationid');
  this.desk=this._routeParams.get('desk');
  $("#registrationForm input").focus(function(){
	$(this).removeClass('error');
	});
	
	$(document).on('click','.back_botom', function ()
		{
		parent.history.back();
		return false;
	});
  }

}
