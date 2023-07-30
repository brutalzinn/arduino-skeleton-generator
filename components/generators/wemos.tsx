export default function WemosGenerator(){
    return(<>
        <div>
          <h1>Wemos Generator</h1>
        </div>
        <form method="POST" action="/api/wemos">
          <table>
            <tbody>
              <tr>
                <td>Network name</td>
                <td>
                  <input type="text" name="config_network_name" />
                </td>
              </tr>
              <tr>
                <td>Network Password</td>
                <td>
                  <input type="text" name="config_network_password" />
                </td>
              </tr>
              <tr>
                <td>IP ADDRESS</td>
                <td>
                  <input type="text" defaultValue="192,168,0,155" name="config_network_ip" />
                </td>
              </tr>
              <tr>
                <td>WEB SOCKET PORT</td>
                <td>
                  <input type="text" defaultValue={5000} name="config_socket_port" />
                </td>
              </tr>
              <tr>
                <td>Network gateway</td>
                <td>
                  <input
                    type="text"
                    defaultValue="192,168,0,1"
                    name="config_network_gateway"
                  />
                </td>
              </tr>
              <tr>
                <td>Network subnet</td>
                <td>
                  <input
                    type="text"
                    defaultValue="255,255,255,0"
                    name="config_network_subnet"
                  />
                </td>
              </tr>
              <tr>
                <td>Network dns</td>
                <td>
                  <input type="text" defaultValue="192,168,0,1" name="config_network_dns" />
                </td>
              </tr>
              <tr>
                <td >
                  <input type="submit" value="Generate"/>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </>
      )
}