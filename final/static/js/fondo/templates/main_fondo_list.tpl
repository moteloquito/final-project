<div id="fondosList">
  <p>Lista de fondos</p>
  <div class="container">
    <ul>
      <% $.each(fondos, function(key, fondo){ %>
      <li><%= fondo.get('name') %></li>
      <% }); %>
    </ul>
  </div>
</div>
