defmodule Vector.SessionChannel do
  use Phoenix.Channel

  def join("sessions:" <> sess_id, params, socket) do
    {:ok, assign(socket, :sess_id, sess_id)}
  end

  def handle_in("new_msg", payload, socket) do
    msg = Vector.Zone.state()
    {:reply, {:ok, msg}, socket}
  end
end
