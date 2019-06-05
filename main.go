package main

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/mattn/go-sqlite3"
	"github.com/ozgurOdun/finger/models"
	_ "github.com/ozgurOdun/finger/routers"
	"os"
)

var o orm.Ormer

func init() {
	cleanDb := beego.AppConfig.DefaultBool("CleanDB", false)
	dbName := beego.AppConfig.DefaultString("DBName", "asd")
	NewDb(dbName, cleanDb)

}
func NewDb(name string, cleanDb bool) {
	_, err := os.Stat("Database")
	if os.IsNotExist(err) {
		os.MkdirAll("Database", os.ModePerm)
	}
	orm.RegisterDriver("sqlite", orm.DRSqlite)
	orm.RegisterDataBase("default", "sqlite3", "Database/"+name+".db")
	orm.RegisterModel(new(models.Finger))

	o = orm.NewOrm()
	o.Using("default")

	if _, err := os.Stat("Database/" + name + ".db"); os.IsNotExist(err) {
		err := orm.RunSyncdb("default", true, false)
		if err != nil {
			fmt.Println("Runsyncdb Error:", err)
			return
		}
	} else {
		if cleanDb == false {
			err := orm.RunSyncdb("default", false, false)
			if err != nil {
				fmt.Println("Runsyncdb Error:", err)
				return
			}
		} else {
			err := orm.RunSyncdb("default", true, true)
			if err != nil {
				fmt.Println("Runsyncdb Error:", err)
				return
			}
		}
	}

}

func main() {
	beego.Run()
}
