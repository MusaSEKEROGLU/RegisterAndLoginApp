AccountsController Api url adresidir.


using System;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using LoginAndRegisterAPI.Models;
using System.Xml.Linq;
using System.Web.Http.Cors;
using LoginAndRegisterAPI;

namespace LoginAndRegisterAPI.Controllers
{
    //ekledik
    [RoutePrefix("api/Accounts")]
    public class AccountsController : ApiController
    {
        //Database bağlantı ayarı.
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connection"].ConnectionString);
        SqlCommand cmd = null;
        SqlDataAdapter da = null;

        //Kayıt oluştur.
        [HttpPost]
        [Route("Registration")]
        public String Registration(Employee employee)
        {
            String msg = string.Empty;

            try
            {
                cmd = new SqlCommand("usp_Registration", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("Name", employee.Name);
                cmd.Parameters.AddWithValue("Phone", employee.Phone);
                cmd.Parameters.AddWithValue("Address", employee.Address);
                cmd.Parameters.AddWithValue("IsActive", employee.IsActive);
                conn.Open();
                int m = cmd.ExecuteNonQuery();
                conn.Close();

                if (m > 0)
                    msg = "Kayıt olma işlemi başarıyla gerçekleşti.";
                else
                    msg = "Kayıt işlemi yapılırken hata oluştu.";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }

        //Giriş yap.
        [HttpPost]
        [Route("Login")]
        public String Login(Employee employee)
        {
            String msg = string.Empty;

            try
            {
                da = new SqlDataAdapter("usp_Login", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("Name", employee.Name);
                da.SelectCommand.Parameters.AddWithValue("Phone", employee.Phone);
                DataTable dt = new DataTable();
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                    msg = "Geçerli kullanıcı.";
                else
                    msg = "Geçersiz kullanıcı.";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
    }
}



