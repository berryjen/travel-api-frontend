import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deactivateAccount, deleteAccount } from '../api/userLifecycle';
import './user-deactivate-delete.css'; // optional extracted styles

const UserDeactivateDelete = ({ setUserName }) => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [immediate, setImmediate] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [phase, setPhase] = useState('menu'); // 'menu' | 'delete'

    const clearStatus = () => {
        setError(null);
        setSuccess(null);
    };

    const handleDeactivate = async () => {
        clearStatus();
        setLoading(true);
        try {
            const data = await deactivateAccount();
            setSuccess(data.message || 'Account deactivated.');
            setTimeout(() => {
                setUserName(null);
                navigate('/login');
            }, 2500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        clearStatus();

        if (!password) {
            setError('Password is required to delete your account.');
            return;
        }

        setLoading(true);
        try {
            const data = await deleteAccount({ password, immediate });
            setSuccess(data.message || 'Account deleted permanently.');
            setTimeout(() => {
                setUserName(null);
                navigate('/login');
            }, 2500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (phase === 'menu') {
        return (
            <div className="lifecycle-container">
                <h2>Account Lifecycle</h2>
                {error && <div className="alert error" role="alert">{error}</div>}
                {success && <div className="alert success" role="status">{success}</div>}

                <p>Deactivating starts a 30-day cooling-off period. You can reactivate anytime during that window.</p>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleDeactivate}
                    disabled={loading}
                >
                    {loading ? 'Processing…' : 'Deactivate Account'}
                </button>

                <hr />

                <p>Deletion is permanent. If your account is deactivated, you must wait 30 days unless you choose immediate deletion.</p>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => { clearStatus(); setPhase('delete'); }}
                    disabled={loading}
                >
                    Delete Account…
                </button>
            </div>
        );
    }

    return (
        <div className="lifecycle-container">
            <h2>Confirm Account Deletion</h2>
            {error && <div className="alert error" role="alert">{error}</div>}
            {success && <div className="alert success" role="status">{success}</div>}

            <form onSubmit={handleDelete} noValidate>
                <label htmlFor="del-password">
                    Enter your password to confirm:
                    <input
                        id="del-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                </label>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={immediate}
                        onChange={(e) => setImmediate(e.target.checked)}
                        disabled={loading}
                    />
                    Immediately delete (bypass 30-day window)
                </label>

                <div className="actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setPhase('menu')}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-danger"
                        disabled={loading || !password}
                    >
                        {loading ? 'Deleting…' : 'Permanently Delete Account'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserDeactivateDelete;