import { useEffect, useState } from 'react';
import './subscriptions.css';
import { FaTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Subscriptions = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = () => {
    fetch('http://localhost:9000/subscription/admin/subscriptions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEmails(data.emails);
        } else {
          toast.error(data.message || "Failed to fetch emails");
        }
      })
      .catch(err => {
        console.error("Error fetching emails:", err);
        toast.error("Error fetching emails");
      });
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const deleteEmail = async (email) => {
    const confirm = window.confirm(`Are you sure you want to delete ${email}?`);
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:9000/subscription/admin/subscriptions/${email}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Deleted successfully");
        fetchEmails(); 
      } else {
        toast.error(data.message || "Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Server error");
    }
  };

  return (
    <div className="subscription-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="subscription-title">All Subscription</h3>

      <div className="subscription-table table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>EMAIL SUBSCRIPTION</th>
              <th>DATE</th>
              <th className='text-center'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {emails.length > 0 ? (
              emails.map((emailObj, index) => (
                <tr key={index}>
                  <td>{emailObj.email}</td>
                  <td>{new Date(emailObj.date || emailObj.createdAt).toDateString()}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteEmail(emailObj.email)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No subscriptions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscriptions;
