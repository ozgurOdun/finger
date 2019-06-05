package models

import (
	//"github.com/astaxie/beego/orm"
	"time"
)

type Finger struct {
	Id                        int       `orm:"pk,auto"`
	Created                   time.Time `orm:"auto_now_add;type(datetime)"`
	ProcessTime               string    `form:"time"`
	Hash                      string    `form:"hash"`
	Details                   string    `form:"colorDepth"`
	UserAgent                 string    `form:"userAgent"`
	Webdriver                 string    `form:"webdriver"`
	Language                  string    `form:"language"`
	ColorDepth                string    `form:"colorDepth"`
	DeviceMemory              string    `form:"deviceMemory"`
	HardwareConcurrency       string    `form:"hardwareConcurrency"`
	ScreenResolution          string    `form:"screenResolution"`
	AvailableScreenResolution string    `form:"availableScreenResolution"`
	TimezoneOffset            string    `form:"timezoneOffset"`
	Timezone                  string    `form:"timezone"`
	SessionStorage            string    `form:"sessionStorage"`
	LocalStorage              string    `form:"localStorage"`
	IndexedDb                 string    `form:"indexedDb"`
	AddBehavior               string    `form:"addBehavior"`
	OpenDatabase              string    `form:"openDatabase"`
	CpuClass                  string    `form:"cpuClass"`
	Platform                  string    `form:"platform"`
	Plugins                   string    `form:"plugins"`
	Canvas                    string    `form:"canvas"`
	Webgl                     string    `form:"webgl"`
	WebglVendorAndRenderer    string    `form:"webglVendorAndRenderer"`
	AdBlock                   string    `form:"adBlock"`
	HasLiedLanguages          string    `form:"hasLiedLanguages"`
	HasLiedResolution         string    `form:"hasLiedResolution"`
	HasLiedOs                 string    `form:"hasLiedOs"`
	HasLiedBrowser            string    `form:"hasLiedBrowser"`
	TouchSupport              string    `form:"touchSupport"`
	Fonts                     string    `form:"fonts"`
	Audio                     string    `form:"audio"`
}
