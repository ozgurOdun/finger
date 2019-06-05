package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/ozgurOdun/finger/models"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	domain := beego.AppConfig.DefaultString("domain", "localhost:8080")
	c.Data["domain"] = domain
	c.TplName = "index.tpl"
}

func (c *MainController) Record() {
	o := orm.NewOrm()
	o.Using("default")
	c.TplName = "thanks.tpl"

	if c.Ctx.Input.Method() == "POST" {
		f := models.Finger{}
		if err := c.ParseForm(&f); err != nil {
			fmt.Println(err)
		}
		cookie := c.Ctx.Input.Cookie("Identifier")
		fmt.Println("cookie:", cookie)
		f.Cookie = cookie
		fmt.Println(o.Insert(&f))
	}
	c.Redirect("/thanks", 302)
}

func (c *MainController) Thanks() {
	c.TplName = "thanks.tpl"
}
