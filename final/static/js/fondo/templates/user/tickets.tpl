<div id="ticketsList">
  <p>Ticket's list</p>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="table-responsive">
	<table class="table table-condensed table-hover table-bordered">
	  <thead>
	  <tr>
	    <th>Id</th>
	    <th>Description</th>
	    <th>$</th>
	    <th>Date</th>
	  </tr>
	  </thead>
	  <tbody>
	  <% $.each(tickets, function(key, ticket) { %>
	  <tr>
	    <td class="number-value"><%= ticket.get('id') %></td>
	    <td><%= ticket.get('description') %></td>
	    <td class="price-value"><%= ticket.get('value') %></td>
	    <td><%= ticket.get('date') %></td>
	  </tr>
	  <% }) %>
	  </tbody>
	</table>
      </div>
    </div>
  </div>
</div>
