<div class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title">
      <a data-toggle="collapse" href="#collapseTickets-<%= status %>">
        <%= title %>
      </a>
    </h4>
  </div>
  <div id="collapseTickets-<%= status %>" class="panel-collapse collapse in">
    <!--<div class="panel-body"> -->
      <div class="table-responsive">
        <table class="table table-condensed table-bordered table-hover">
	  <thead>
	    <tr>
	      <th>Id</th>
	      <th>Description</th>
	      <th>$</th>
	      <th>Date</th>
	      <th>Action</th>
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
	      <td class="number-value"><%= ticket.get('date') %></td>
	      <td>
		<div class="center-block">
		  <span data-id="<%= ticket.get('id') %>" class="ticketok glyphicon glyphicon-ok"></span>
		  <span class="glyphicon glyphicon-remove"></span>
		</div>
	      </div>
	      </td>
	    </tr>
	    <% }); %>
	    <% } %>
	  </tbody>
        </table>
        <!--       </div> -->
        <ul class="pager pager-sm">
          <% if (pagination.get('has_previous')) { %>
          <li class="previous"><a href="#">&larr; Previuos</a></li>
          <% } %>
          <% if (pagination.get('has_next')) { %>
          <li class="next"><a href="#">Next &rarr;</a></li>
          <% } %>
        </ul>
    </div>
  </div>
</div>
