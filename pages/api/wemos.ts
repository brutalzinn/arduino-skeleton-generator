import type { NextApiRequest, NextApiResponse } from 'next'
import archiver from 'archiver'
import { ReadData, WriteData } from '../../shared/util'
import path from 'path'
type ResponseData = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method != 'POST'){
    res.status(405).json({data: "cant hadle this method"})
    return
  }


  const zip = archiver('zip')
  zip.on('error', function(err) {
    res.status(500).send(err.data);
  });

  zip.on('end', function() {
    console.log('Archive wrote %d bytes', zip.pointer());
  });
  zip.pipe(res)

  let keyConfig = [{
    name: "CONFIG_WIFI_SSID",
    value: req.body.config_network_name
  },{
    name: "CONFIG_WIFI_PASSWORD",
    value: req.body.config_network_password
  },{
    name: "CONFIG_SOCKET_PORT",
    value: req.body.config_socket_port
  },{
    name: "CONFIG_IP",
    value: req.body.config_network_ip
  },{
    name: "CONFIG_GATEWAY",
    value: req.body.config_network_gateway
  },{
    name: "CONFIG_SUBNET",
    value: req.body.config_network_subnet
  },
  {
    name: "CONFIG_DNS",
    value: req.body.config_network_dns
  }]
const dir = path.join(process.cwd(), 'generators', 'wemos' )
const configDataText = await ReadData( path.join(dir, "config.h"))
let configText = {
  keyConfigs: keyConfig,
  text: configDataText
}  
const configData = await WriteData(configText)


zip
  .append(configData, { name: 'config.h' })
  .append("config.h",  { name: '.gitignore' })
  .file( path.join(dir, "README.md"), { name: 'README.md' })
  .file(path.join(dir, "wemos.ino"), { name: 'wemos.ino' })
  .finalize();
 
}