<p>Lista de fondos</p>
<div class="container">
  <ul>
    <% $.each(fondos, function(key, fondo){ %>
    <!-- <li><a href="#tickets/<%= fondo.get('id') %>"><%= fondo.get('name') %></a></li> -->
    <li><a href="#dashboard"><%= fondo.get('name') %></a></li>
    <% }); %>
  </ul>
</div>
