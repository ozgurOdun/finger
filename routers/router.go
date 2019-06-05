package routers

import (
	"github.com/astaxie/beego"
	"github.com/ozgurOdun/finger/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/record", &controllers.MainController{}, "post:Record")
	beego.Router("/thanks", &controllers.MainController{}, "get:Thanks")
}
