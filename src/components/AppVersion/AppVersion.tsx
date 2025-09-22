import React from "react"
import './AppVersion.modules.css'
import appPackage from '../../../package.json'

const AppVersion = () => (
  <div className="app-version">
    <p className="app-version-value">Version: {appPackage.version}</p>
  </div>
)

export default AppVersion
