import type { NextApiRequest, NextApiResponse } from 'next'
import archiver from 'archiver'
import { ReadData, WriteData } from '../../shared/util'

type ResponseData = {
  data: string
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body = req.body
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

const configDataText = await ReadData('shared/files/generators/wemos/config.h')
let configText = {
  keyConfigs: keyConfig,
  text: configDataText
}  
const configData = await WriteData(configText)
zip.append(configData, { name: 'config.h' })
  .append("config.h",  { name: '.gitignore' })
  .file('shared/files/generators/wemos/README.md', { name: 'README.md' })
  .file('shared/files/generators/wemos/wemos.ino', { name: 'wemos.ino' })
  .finalize();
}