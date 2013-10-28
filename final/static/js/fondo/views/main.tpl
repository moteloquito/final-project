<ul>
  <% $.each(fondos, function(key, fondo){ %>
  <li><%= fondo.get('name') %></li>
  <% }); %>
</ul>
