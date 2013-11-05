<div class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title">
      <a data-toggle="collapse" href="#collapseTickets">
        Tickets
      </a>
    </h4>
  </div>
  <div id="collapseTickets" class="panel-collapse collapse in">
    <!--<div class="panel-body"> -->
      <div class="table-responsive">
        <table class="table table-condensed table-bordered table-hover">
	  <thead>
	    <tr>
	      <th>Id</th>
	      <th>Description</th>
	      <th>$</th>
	      <th>Date</th>
	    </tr>
	  </thead>
	  <tbody>
	    <% if (tickets.length === 0) { %>
	    <tr>
	      <td colspan="4" class="text-center">No tickets</td>
	    </tr>
	    <% } else { %>
	    <% $.each(tickets, function(key, ticket) { %>
	    <tr>
	      <td class="number-value"><%= ticket.get('id') %></td>
	      <td><%= ticket.get('description') %></td>
	      <td class="price-value"><%= formatNumber.new(ticket.get('value'), 2, '$ ') %></td>
	      <td><%= ticket.get('date') %></td>
	    </tr>
	    <% }); %>
	    <% } %>
	  </tbody>
        </table>
        <!--       </div> -->
    </div>
  </div>
</div>
